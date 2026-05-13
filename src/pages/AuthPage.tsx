import { useState, type FormEvent } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { Captcha } from '../components/ui/Captcha'
import { addMemberToSubgrupo } from '../services/subgrupoService'

type Tab = 'login' | 'register' | 'forgot' | 'reset'

export function AuthPage() {
  const { user, isActive } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const [tab, setTab] = useState<Tab>(() => {
    const t = searchParams.get('tab')
    if (t === 'reset') return 'reset'
    return 'login'
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPass, setShowPass] = useState(false)

  // Campos
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [userType, setUserType] = useState<'funcionario' | 'alumno'>('alumno')

  // Captcha
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  // Si ya está logueado y activo, redirigir
  if (user && isActive) return <Navigate to="/fixture" replace />

  function resetMessages() {
    setError(null)
    setSuccess(null)
  }

  function handleTabChange(nextTab: Tab) {
    setTab(nextTab)
    resetMessages()
    setCaptchaToken(null)
    setSearchParams({})
  }

  async function handleLogin(e: FormEvent) {
  e.preventDefault()

  setError(null)

  if (!captchaToken) {
    setError(
      'Por favor completá la verificación de seguridad.'
    )
    return
  }

  setLoading(true)

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        captchaToken,
      },
    })

  if (error) {
    setError(traducirError(error.message))
    setLoading(false)
    return
  }

  try {
    const user = data.user

    if (user) {
      const userType =
        user.user_metadata?.user_type

      const FUNCIONARIO_SUBGRUPO_ID = '7ad91750-1d65-4b12-9ca6-04354642bb48'

      const ALUMNO_SUBGRUPO_ID = '056c73da-1399-42b7-a955-be5419e2d7a2'

      const subgrupoId =
        userType === 'funcionario'
          ? FUNCIONARIO_SUBGRUPO_ID
          : ALUMNO_SUBGRUPO_ID

      // Verificar si ya pertenece
      const { data: existing, error: checkError } =
        await supabase
          .from('subgrupo_members')
          .select('id')
          .eq('user_id', user.id)
          .eq('subgrupo_id', subgrupoId)
          .maybeSingle()

      if (checkError) {
        console.error(
          'Error verificando subgrupo',
          checkError
        )
      }

      // Insertar solo si no existe
      if (!existing) {
        await addMemberToSubgrupo(
          subgrupoId,
          user.id
        )
      }
    }
  } catch (err) {
    console.error(
      'Error agregando usuario al subgrupo',
      err
    )
  }

  setLoading(false)
}

  async function handleRegister(e: FormEvent) {
    e.preventDefault()

    setError(null)

    if (!captchaToken) {
      setError(
        'Por favor completá la verificación de seguridad.'
      )
      return
    }

    setLoading(true)

    if (username.length < 3) {
      setError(
        'El nombre de usuario debe tener al menos 3 caracteres.'
      )

      setLoading(false)

      return
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError(
        'El usuario solo puede contener letras, números y _'
      )

      setLoading(false)

      return
    }

    // HARDCODE
    const FUNCIONARIO_SUBGRUPO_ID = '7ad91750-1d65-4b12-9ca6-04354642bb48'

    const ALUMNO_SUBGRUPO_ID = '056c73da-1399-42b7-a955-be5419e2d7a2'

    const subgrupoId =
      userType === 'funcionario'
        ? FUNCIONARIO_SUBGRUPO_ID
        : ALUMNO_SUBGRUPO_ID

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            full_name: displayName,
            user_type: userType,
          },
          captchaToken,
          emailRedirectTo: window.location.origin,
        },
      })

    if (error) {
      setError(traducirError(error.message))

      setLoading(false)

      return
    }

    setSuccess(
      '¡Registro exitoso! Revisa tu email para confirmar tu cuenta.'
    )

    setEmail('')
    setPassword('')
    setDisplayName('')
    setUsername('')
    setUserType('alumno')

    // invalida token usado
    setCaptchaToken(null)

    setLoading(false)
  }

  async function handleRecover(e: FormEvent) {
    e.preventDefault()

    setError(null)

    if (!captchaToken) {
      setError('Por favor completá la verificación de seguridad.')
      return
    }

    setLoading(true)

    const { error } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?tab=reset`,
        captchaToken,
      })

    if (error) {
      setError(traducirError(error.message))
    } else {
      setSuccess(
        'Se ha enviado un correo con instrucciones para restablecer tu contraseña.'
      )

      setEmail('')

      // invalida token usado
      setCaptchaToken(null)
    }

    setLoading(false)
  }

  async function handleResetPassword(e: FormEvent) {
    e.preventDefault()

    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      setError(traducirError(error.message))
    } else {
      setSuccess(
        'Tu contraseña ha sido actualizada correctamente. Ya podés ingresar.'
      )

      setTab('login')
      setPassword('')
      setSearchParams({})
    }

    setLoading(false)
  }

  return (
  <div className="min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">
    <div className="relative w-full max-w-sm">
      {/* Card */}
      <div className="card p-6 relative z-10">
        {/* Tabs */}
        {tab !== 'forgot' && tab !== 'reset' && (
          <div className="flex rounded-lg bg-zinc-800 p-1 mb-5">
            {(['login', 'register'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => handleTabChange(t)}
                className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  tab === t
                    ? 'bg-white text-zinc-800 shadow-sm'
                    : 'text-zinc-100'
                }`}
              >
                {t === 'login'
                  ? 'Ingresar'
                  : 'Registrarse'}
              </button>
            ))}
          </div>
        )}

        {tab === 'forgot' && (
          <div className="mb-5">
            <button
              onClick={() => handleTabChange('login')}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              ← Volver al ingreso
            </button>

            <h2 className="text-lg font-bold text-text-primary mt-2">
              Recuperar contraseña
            </h2>

            <p className="text-xs text-text-muted mt-1">
              Ingresá tu email y te enviaremos un link para crear una nueva.
            </p>
          </div>
        )}

        {tab === 'reset' && (
          <div className="mb-5">
            <h2 className="text-lg font-bold text-text-primary">
              Nueva contraseña
            </h2>

            <p className="text-xs text-text-muted mt-1">
              Elegí una contraseña segura para tu cuenta.
            </p>
          </div>
        )}

        {/* Mensaje éxito */}
        {success && (
          <div className="bg-accent border border-primary/30 text-white text-sm rounded-lg p-3 mb-4">
            {success}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-error/10 border border-error/30 text-error text-sm rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        {/* Formulario */}
        {!success && (
          <>
            <form
              onSubmit={
                tab === 'login'
                  ? handleLogin
                  : tab === 'register'
                  ? handleRegister
                  : tab === 'reset'
                  ? handleResetPassword
                  : handleRecover
              }
              className="space-y-4"
            >
              {tab !== 'forgot' && tab !== 'reset' && (
                <>
                  {tab === 'register' && (
                    <>
                      <div>
                        <label className="block text-xs text-zinc-700 mb-1.5">
                          Nombre para mostrar
                        </label>

                        <input
                          type="text"
                          value={displayName}
                          onChange={e =>
                            setDisplayName(e.target.value)
                          }
                          className="input"
                          placeholder="Ej: Juan García"
                          required
                          maxLength={60}
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-zinc-700 mb-1.5">
                          Nombre de usuario{' '}
                          <span className="text-text-muted">
                            (solo letras, números, _)
                          </span>
                        </label>

                        <input
                          type="text"
                          value={username}
                          onChange={e =>
                            setUsername(
                              e.target.value.toLowerCase()
                            )
                          }
                          className="input"
                          placeholder="Ej: juangarcia"
                          required
                          minLength={3}
                          maxLength={30}
                          pattern="[a-zA-Z0-9_]+"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-zinc-700 mb-1.5">
                          Tipo de usuario
                        </label>

                        <select
                          value={userType}
                          onChange={e =>
                            setUserType(
                              e.target.value as
                                | 'funcionario'
                                | 'alumno'
                            )
                          }
                          className="input"
                        >
                          <option value="alumno">
                            Alumno
                          </option>

                          <option value="funcionario">
                            Funcionario
                          </option>
                        </select>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs text-zinc-700 mb-1.5">
                      Email
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="input"
                      placeholder="tu@email.com"
                      required
                      autoComplete={
                        tab === 'login'
                          ? 'email'
                          : 'new-email'
                      }
                    />
                  </div>
                </>
              )}

              {tab === 'forgot' && (
                <div>
                  <label className="block text-xs text-zinc-700 mb-1.5">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input"
                    placeholder="tu@email.com"
                    required
                    autoComplete="email"
                  />
                </div>
              )}

              {tab !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs text-zinc-700">
                      {tab === 'reset'
                        ? 'Nueva contraseña'
                        : 'Contraseña'}
                    </label>

                    {tab === 'login' && (
                      <button
                        type="button"
                        onClick={() => handleTabChange('forgot')}
                        className="text-[11px] text-primary hover:underline focus:outline-none"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e =>
                        setPassword(e.target.value)
                      }
                      className="input pr-10"
                      placeholder={
                        tab === 'register'
                          ? 'Mínimo 6 caracteres'
                          : tab === 'reset'
                          ? 'Ingresá tu nueva contraseña'
                          : '••••••••'
                      }
                      required
                      minLength={6}
                      autoComplete={
                        tab === 'login'
                          ? 'current-password'
                          : 'new-password'
                      }
                    />

                    <button
                      type="button"
                      onClick={() => setShowPass(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                    >
                      {showPass ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={
                  loading ||
                  ((tab === 'login' ||
                    tab === 'register' ||
                    tab === 'forgot') &&
                    !captchaToken)
                }
                className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading && (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                )}

                {tab === 'login'
                  ? 'Ingresar'
                  : tab === 'register'
                  ? 'Crear cuenta'
                  : tab === 'reset'
                  ? 'Guardar nueva contraseña'
                  : 'Enviar instrucciones'}
              </button>
            </form>

            {(tab === 'login' ||
              tab === 'register') && (
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
              </div>
            )}

            {/* CAPTCHA */}
            {(tab === 'login' ||
              tab === 'register' ||
              tab === 'forgot') && (
              <div className="mt-4">
                <Captcha
                  key={tab}
                  onSuccess={token => {
                    setCaptchaToken(token)
                    setError(null)
                  }}
                  onExpire={() => {
                    setCaptchaToken(null)
                  }}
                  onError={() => {
                    setError(
                      'Error al cargar la verificación de seguridad.'
                    )

                    setCaptchaToken(null)
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </div>
)
}

function traducirError(msg: string): string {
  if (msg.includes('Invalid login credentials'))
    return 'Email o contraseña incorrectos.'

  if (msg.includes('User already registered'))
    return 'Ya existe una cuenta con ese email.'

  if (msg.includes('Password should be'))
    return 'La contraseña debe tener al menos 6 caracteres.'

  if (msg.includes('Unable to validate email'))
    return 'El formato del email no es válido.'

  if (msg.includes('Email rate limit'))
    return 'Demasiados intentos. Esperá unos minutos.'

  if (msg.toLowerCase().includes('captcha'))
    return 'Error en la verificación de seguridad (Captcha).'

  return msg
}
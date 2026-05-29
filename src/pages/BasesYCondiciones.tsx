import { Shield, AlertTriangle, Trophy, Clock, Users, Gavel } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
        <span className="w-5 h-px bg-border inline-block" />
        {title}
        <span className="flex-1 h-px bg-border inline-block" />
      </h2>

      <div className="card p-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center">
            <Icon size={14} />
          </div>

          <p className="text-sm font-semibold text-white">
            {title}
          </p>
        </div>

        <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="text-white mt-0.5">•</span>
      <p className="flex-1">{children}</p>
    </div>
  )
}

function FuncionarioTerms() {
  return (
    <>
      <Section icon={Users} title="1. Organizador">
        <Bullet>
          La Penca Mundial 2026 – Funcionarios Anglo es una propuesta
          organizada por ICAU dirigida exclusivamente a funcionarios y
          docentes activos de The Anglo School e Instituto Cultural
          Anglo-Uruguayo, incluyendo a la red de Centros ANGLO de todo el
          país.
        </Bullet>

        <Bullet>
          La iniciativa tiene como objetivo generar un espacio de integración,
          entretenimiento y participación entre los distintos equipos de la
          comunidad Anglo, promoviendo el encuentro y la diversión a través
          de una experiencia compartida en torno al Mundial 2026.
        </Bullet>
      </Section>

      <Section icon={Shield} title="2. Participantes habilitados">
        <Bullet>
          Podrán participar exclusivamente funcionarios y docentes activos de
          Instituto Cultural Anglo-Uruguayo y The Anglo School, incluyendo a
          la red de Centros ANGLO de todo el país, que cuenten con una cuenta
          registrada en la aplicación oficial de la Penca Anglo Mundial 2026.
        </Bullet>
      </Section>

      <Section icon={Gavel} title="3. Condición administrativa">
        <Bullet>
          Para resultar acreedor de cualquier premio, el participante deberá
          mantener vínculo activo como funcionario al momento de la entrega
          del premio correspondiente.
        </Bullet>

        <Bullet>
          La organización podrá verificar la situación funcional de cada
          participante previo a la adjudicación de premios.
        </Bullet>
      </Section>

      <Section icon={Clock} title="4. Modalidad de participación">
        <Bullet>
          La participación en la Penca es gratuita y no persigue fines de
          recaudación económica.
        </Bullet>

        <Bullet>
          Cada participante podrá realizar sus pronósticos deportivos dentro
          de los plazos establecidos por la organización a través del sitio
          oficial de la Penca y conforme a las reglas y funcionamiento
          detallados en la sección “Ayuda”.
        </Bullet>
      </Section>

      <Section icon={Trophy} title="5. Determinación de ganadores">
        <Bullet>
          Los ganadores serán determinados según el puntaje acumulado obtenido
          a lo largo de la competencia, de acuerdo con las reglas de
          puntuación y criterios establecidos en el reglamento oficial de la
          Penca Mundial 2026.
        </Bullet>
      </Section>

      <Section icon={AlertTriangle} title="6. Empates">
        <Bullet>
          En caso de empate en el puntaje final entre dos o más participantes
          para cualquiera de las posiciones premiadas, el ganador será
          definido mediante sorteo realizado por la organización.
        </Bullet>
      </Section>

      <Section icon={Trophy} title="7. Premios">
        <Bullet>
          Los premios serán comunicados oportunamente por los canales oficiales
          de Anglo.
        </Bullet>

        <Bullet>
          La organización se reserva el derecho de sustituir premios por otros
          de similar valor en caso de fuerza mayor o imposibilidad de entrega.
        </Bullet>

        <Bullet>
          Para la entrega y comunicación de premios, los ganadores autorizan
          expresamente al Instituto Cultural Anglo-Uruguayo a utilizar su
          nombre, imagen y/o registros fotográficos o audiovisuales vinculados
          a la premiación, con fines de comunicación y difusión institucional
          en sus distintos canales oficiales, sin derecho a compensación
          adicional.
        </Bullet>
      </Section>

      <Section icon={Users} title="8. Conducta y uso adecuado">
        <Bullet>
          La organización podrá descalificar a cualquier participante que haga
          un uso indebido del sistema, proporcione información falsa o incurra
          en conductas contrarias al espíritu de la propuesta.
        </Bullet>
      </Section>

      <Section icon={Clock} title="9. Modificaciones">
        <Bullet>
          La organización podrá modificar total o parcialmente las presentes
          Bases y Condiciones cuando circunstancias no previstas así lo
          justifiquen, comprometiéndose a comunicar cualquier cambio por los
          medios oficiales correspondientes.
        </Bullet>
      </Section>

      <Section icon={Shield} title="10. Aceptación">
        <Bullet>
          La participación en la Penca Mundial 2026 – Funcionarios Anglo
          implica la aceptación total de estas Bases y Condiciones, así como
          de las reglas de funcionamiento publicadas en la sección
          “Reglamento y Ayuda de la Penca Mundial 2026”.
        </Bullet>
      </Section>

      <div className="card p-4">
        <p className="text-sm text-zinc-300 leading-relaxed text-center italic">
          Agradecemos la participación de todos y los invitamos a sumarse a
          esta propuesta, pensada para compartir, disfrutar y seguir
          fortaleciendo el espíritu de comunidad que nos caracteriza.
        </p>

        <p className="text-sm text-zinc-300 text-center font-semibold mt-3">
          Les deseamos la mejor de las suertes a lo largo de toda la
          competencia.
        </p>
      </div>
    </>
  )
}

function EstudianteTerms() {
  return (
    <>
      <Section icon={Users} title="1. Organizador">
        <Bullet>
          La Penca Mundial 2026 es una propuesta organizada por el Instituto
          Cultural Anglo-Uruguayo dirigida exclusivamente a alumnos
          pertenecientes a la red Anglo de todo el país.
        </Bullet>

        <Bullet>
          La iniciativa tiene como objetivo generar un espacio de integración,
          entretenimiento y participación entre la comunidad Anglo,
          promoviendo el encuentro y la diversión a través de una experiencia
          compartida en torno al Mundial 2026.
        </Bullet>
      </Section>

      <Section icon={Shield} title="2. Participantes habilitados">
        <Bullet>
          Podrán participar aquellos alumnos activos de cualquier centro Anglo
          del Uruguay, mayores de edad, que cuenten con una cuenta registrada
          en la aplicación oficial de la Penca Anglo Mundial 2026.
        </Bullet>

        <Bullet>
          Los estudiantes menores de edad podrán participar exclusivamente a
          través de la cuenta y bajo la supervisión de un adulto responsable.
        </Bullet>
      </Section>

      <Section icon={Gavel} title="3. Condición académica y administrativa">
        <Bullet>
          Para resultar acreedor de cualquier premio, el participante deberá
          encontrarse al día con el pago de sus cuotas y obligaciones
          administrativas al momento de la entrega del premio correspondiente.
        </Bullet>

        <Bullet>
          El incumplimiento de esta condición podrá determinar la pérdida del
          derecho al premio, pasando éste al siguiente participante que
          corresponda según el criterio establecido en estas Bases.
        </Bullet>
      </Section>

      <Section icon={Clock} title="4. Modalidad de participación">
        <Bullet>
          La participación en la Penca es gratuita y no persigue fines de
          recaudación económica.
        </Bullet>

        <Bullet>
          Cada participante podrá realizar sus pronósticos deportivos dentro
          de los plazos establecidos por la organización a través del sitio
          oficial de la Penca y conforme a las reglas y funcionamiento
          detallados en la sección “Ayuda”.
        </Bullet>
      </Section>

      <Section icon={Trophy} title="5. Determinación de ganadores">
        <Bullet>
          Los ganadores serán determinados según el puntaje acumulado obtenido
          a lo largo de la competencia, de acuerdo con las reglas de
          puntuación y criterios establecidos en el reglamento oficial de la
          Penca Mundial 2026.
        </Bullet>
      </Section>

      <Section icon={AlertTriangle} title="6. Empates">
        <Bullet>
          En caso de empate en el puntaje final entre dos o más participantes
          para cualquiera de las posiciones premiadas, el ganador será
          definido mediante sorteo realizado por la organización.
        </Bullet>
      </Section>

      <Section icon={Trophy} title="7. Premios">
        <Bullet>
          Los premios serán comunicados oportunamente por los canales oficiales
          de Anglo.
        </Bullet>

        <Bullet>
          La organización se reserva el derecho de sustituir premios por otros
          de similar valor en caso de fuerza mayor o imposibilidad de entrega.
        </Bullet>

        <Bullet>
          En caso de otorgarse becas de estudio como premio, las mismas podrán
          corresponder a cursos para niños, jóvenes o adultos, en modalidad
          presencial, online, de conversación o cursos avanzados, según
          disponibilidad y condiciones académicas definidas por Anglo.
        </Bullet>

        <Bullet>
          Para la entrega y comunicación de premios, los ganadores autorizan
          expresamente al Instituto Cultural Anglo-Uruguayo a utilizar su
          nombre, imagen y/o registros fotográficos o audiovisuales vinculados
          a la premiación, con fines de comunicación y difusión institucional
          en sus distintos canales oficiales, sin derecho a compensación
          adicional.
        </Bullet>
      </Section>

      <Section icon={Users} title="8. Conducta y uso adecuado">
        <Bullet>
          La organización podrá descalificar a cualquier participante que haga
          un uso indebido del sistema, proporcione información falsa o incurra
          en conductas contrarias al espíritu de la propuesta.
        </Bullet>
      </Section>

      <Section icon={Clock} title="9. Modificaciones">
        <Bullet>
          La organización podrá modificar total o parcialmente las presentes
          Bases y Condiciones cuando circunstancias no previstas así lo
          justifiquen, comprometiéndose a comunicar cualquier cambio por los
          medios oficiales correspondientes.
        </Bullet>
      </Section>

      <Section icon={Shield} title="10. Aceptación">
        <Bullet>
          La participación en la Penca Mundial 2026 implica la aceptación total
          de estas Bases y Condiciones, así como de las reglas de
          funcionamiento publicadas en la sección “Reglamento y Ayuda de la
          Penca Mundial 2026”.
        </Bullet>
      </Section>
    </>
  )
}

export function BasesCondicionesPage() {
  const { profile } = useAuth()

  const group = profile?.user_type

  const isFuncionario = group === 'funcionario'
  const isEstudiante = group === 'alumno'

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-xl font-bold text-white italic">
          Bases y Condiciones
        </h1>
      </div>

      {/* Bases dinámicas */}
      {isFuncionario && <FuncionarioTerms />}

      {isEstudiante && <EstudianteTerms />}

      {!isFuncionario && !isEstudiante && (
        <Section icon={AlertTriangle} title="Grupo no reconocido">
          <Bullet>
            No fue posible determinar el grupo asociado a tu cuenta.
          </Bullet>

          <Bullet>
            Contactá a un administrador si el problema persiste.
          </Bullet>
        </Section>
      )}

    </div>
  )
}
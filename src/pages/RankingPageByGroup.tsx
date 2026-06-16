import { Loader2, Target, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLeaderboardByGroup } from '../hooks/useLeaderboardByGroup'
import { useAuth } from '../hooks/useAuth'
import type { LeaderboardEntry } from '../types'

function MedalOrRank({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-white text-lg">🥇</span>
  if (rank === 2) return <span className="text-white text-lg">🥈</span>
  if (rank === 3) return <span className="text-white text-lg">🥉</span>
  return (
    <span className="text-sm font-bold tabular-nums text-white w-6 text-center">
      {rank}
    </span>
  )
}

function Avatar({ entry }: { entry: LeaderboardEntry }) {
  const initials = (entry.display_name || entry.username)[0].toUpperCase()
  if (entry.avatar_url) {
    return (
      <img
        src={entry.avatar_url}
        alt=""
        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
      />
    )
  }
  return (
    <div className="w-9 h-9 rounded-full bg-primary/50 flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-sm">{initials}</span>
    </div>
  )
}

function LeaderboardRow({
  entry,
  isMe,
}: {
  entry: LeaderboardEntry
  isMe: boolean
}) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/usuario/${entry.user_id}/predicciones`)}
      className={`card p-3 flex items-center gap-3 transition-colors cursor-pointer hover:border-primary/40 ${
        isMe ? 'bg-black' : ''
      }`}
    >
      {/* Rank */}
      <div className="flex-shrink-0 w-8 flex justify-center">
        <MedalOrRank rank={entry.rank} />
      </div>

      {/* Avatar */}
      <Avatar entry={entry} />

      {/* Name + stats */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-medium text-white truncate">
            {entry.display_name}
          </span>

          {isMe && (
            <span className="badge bg-primary/20 text-primary text-[10px]">
              Yo
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-0.5">
          <span className="flex items-center gap-1 text-[11px] text-zinc-200">
            <Check size={11} className="text-zinc-300" />
            {entry.predictions_count} pred.
          </span>

          <span className="flex items-center gap-1 text-[11px] text-zinc-200">
            <Target size={11} className="text-zinc-300" />
            {entry.exact_scores} exactos
          </span>
        </div>
      </div>

      {/* Points */}
      <div className="flex-shrink-0 text-right">
        <p className="text-xl font-bold tabular-nums text-primary leading-none">
          {entry.total_points}
        </p>

        <p className="text-[10px] text-zinc-200 mt-0.5">pts</p>
      </div>
    </div>
  )
}

function TopThree({
  entries,
  myId,
}: {
  entries: LeaderboardEntry[]
  myId?: string
}) {
  const [first, second, third] = entries
  const navigate = useNavigate()

  function PodiumCard({
    entry,
    height,
  }: {
    entry: LeaderboardEntry
    height: string
  }) {
    const isMe = entry.user_id === myId

    return (
      <div
        onClick={() =>
          navigate(`/usuario/${entry.user_id}/predicciones`)
        }
        className="flex flex-col items-center gap-2 cursor-pointer"
      >
        <Avatar entry={entry} />

        <p
          className={`text-xs font-medium text-center truncate max-w-[80px] ${
            isMe ? 'text-white' : 'text-white/90'
          }`}
        >
          {entry.display_name}
        </p>

        <div
          className={`w-full flex flex-col items-center justify-end rounded-t-lg ${height} ${
            entry.rank === 1
              ? 'bg-gradient-to-t from-black to-AngloRed'
              : 'bg-gradient-to-t from-black to-AngloRed'
          }`}
        >
          <MedalOrRank rank={entry.rank} />

          <p className="text-sm font-bold text-primary tabular-nums pb-2">
            {entry.total_points}
          </p>
        </div>
      </div>
    )
  }

  if (!first) return null

  return (
    <div className="grid grid-cols-3 gap-2 items-end mb-6">
      {second ? (
        <PodiumCard entry={second} height="h-20" />
      ) : (
        <div />
      )}

      <PodiumCard entry={first} height="h-28" />

      {third ? (
        <PodiumCard entry={third} height="h-16" />
      ) : (
        <div />
      )}
    </div>
  )
}

export function RankingGrupoPage() {
  const { user, profile } = useAuth()

  const myId = user?.id
  const group = profile?.user_type
  const userTypeLabel =
  profile?.user_type === 'funcionario'
    ? '(Funcionarios)'
    : '(Alumnos)'

  const {
    data: entries = [],
    isLoading,
    error,
  } = useLeaderboardByGroup(group)

  const myEntry = entries.find(e => e.user_id === myId)
  const hasMore = entries.length > 3

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <h1 className="text-xl font-bold italic text-white">Ranking {userTypeLabel}</h1>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-primary" size={28} />
        </div>
      )}

      {error && (
        <div className="card p-4 text-sm text-center text-text-muted">
          Error cargando el ranking. Verificá la conexión a Supabase.
        </div>
      )}

      {!isLoading && !error && entries.length === 0 && (
        <div className="card p-8 text-center">
          <p className="text-text-muted text-sm">
            Aún no hay puntos registrados. ¡El torneo empieza el 11 de junio!
          </p>
        </div>
      )}

      {!isLoading && !error && entries.length > 0 && (
        <>
          {/* Podio top 3 */}
          <TopThree entries={entries.slice(0, 3)} myId={myId} />

          {/* Mi posición fijada (si no estoy en top 3 y estoy logueado) */}
          {myEntry && myEntry.rank > 3 && (
            <div className="mb-3">
              <p className="text-xs text-white uppercase tracking-wide mb-1.5">
                Tu posición
              </p>
              <LeaderboardRow entry={myEntry} isMe />
            </div>
          )}

          {/* Lista completa */}
          {hasMore && (
            <div className="space-y-2">
              <p className="text-xs text-white uppercase tracking-wide mb-1.5">
                Tabla completa
              </p>
              {entries.map(entry => (
                <LeaderboardRow
                  key={entry.user_id}
                  entry={entry}
                  isMe={entry.user_id === myId}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Loader2, Lock } from 'lucide-react'
import { useProfile } from '../hooks/useProfile'

import { RequireAuth, RequireActive } from '../components/auth/AuthGuard'
import { TeamFlag } from '../components/ui/TeamFlag'
import { useUserPredictions } from '../hooks/useUserPredictions'
import { useLeaderboardByGroup } from '../hooks/useLeaderboardByGroup'


export function UserPredictionsPage() {
  const { userId } = useParams<{ userId: string }>()
  const { data: profile } = useProfile(userId)
  const { data: preds = [], isLoading } = useUserPredictions(userId)

  const past = useMemo(
    () =>
      preds
        .filter(p => new Date(p.match.match_datetime) < new Date())
        .sort(
          (a, b) =>
            new Date(b.match.match_datetime).getTime() -
            new Date(a.match.match_datetime).getTime()
        ),
    [preds]
  )

  const { data: leaderboard = [] } = useLeaderboardByGroup(
    profile?.user_type
  )

  const leaderboardEntry = useMemo(
    () => leaderboard.find(e => e.user_id === userId),
    [leaderboard, userId]
  )

  const matchPoints = useMemo(
    () =>
      past.reduce(
        (sum, pred) => sum + (pred.points_earned ?? 0),
        0
      ),
    [past]
  )

  const extraPoints = useMemo(
    () =>
      Math.max(
        0,
        (leaderboardEntry?.total_points ?? 0) - matchPoints
      ),
    [leaderboardEntry, matchPoints]
  )

  return (
    <RequireAuth>
      <RequireActive>
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <h1 className="text-xl font-bold text-white italic">
            Predicciones de {profile?.display_name ?? '...'}
          </h1>

          <div className="card p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Puntos extra</p>
              <p className="text-xs text-zinc-500">
                (Próximamente podrás ver el desglose)
              </p>
            </div>

            <span className="text-xl font-bold text-white">
              {extraPoints} pts
            </span>
        </div>

          {isLoading && (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-white" size={28} />
            </div>
          )}

          {!isLoading && past.length === 0 && (
            <p className="text-zinc-400 text-sm text-center py-12">
              Este usuario aún no tiene predicciones visibles.
            </p>
          )}

          {!isLoading && past.length > 0 && (
            <div className="space-y-3">
              {past.map(pred => {
                const m = pred.match

                const hasResult = m.home_score_90 !== null

                return (
                  <div
                    key={pred.id}
                    className="card p-3 flex items-center gap-3"
                  >
                    {/* Match info */}
                    <div className="flex-shrink-0 w-10 text-center">
                      <p className="text-[11px] text-text-muted">
                        #{m.match_number}
                      </p>

                      {m.group ? (
                        <span className="badge-primary text-[9px]">
                          G{m.group.name}
                        </span>
                      ) : (
                        <span className="badge bg-accent/20 text-accent text-[9px]">
                          {m.phase.name.substring(0, 3)}
                        </span>
                      )}
                    </div>

                    {/* Teams */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex-1 min-w-0">
                          <TeamFlag
                            team={m.home_team}
                            slotLabel={m.home_slot_label}
                            size="sm"
                            align="left"
                            abbrev
                          />
                        </div>

                        <div className="flex-shrink-0 text-center space-y-0.5">
                          {hasResult ? (
                            <p className="text-xs font-bold text-white tabular-nums">
                              {m.home_score_90} – {m.away_score_90}
                            </p>
                          ) : (
                            <div className="flex items-center gap-1 text-zinc-300">
                              <Lock size={10} />
                              <span className="text-[10px]">
                                Esperando
                              </span>
                            </div>
                          )}

                          <p className="text-[12px] text-zinc-200">
                            Pred: {pred.home_score}–{pred.away_score}
                          </p>

                          {hasResult && (
                            <p className="text-[12px] text-zinc-200">
                              {pred.points_earned ?? 0} pts
                            </p>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 flex justify-end">
                          <TeamFlag
                            team={m.away_team}
                            slotLabel={m.away_slot_label}
                            size="sm"
                            align="right"
                            abbrev
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </RequireActive>
    </RequireAuth>
  )
}
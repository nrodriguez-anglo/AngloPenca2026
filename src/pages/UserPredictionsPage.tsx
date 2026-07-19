import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Loader2, Lock } from 'lucide-react'
import { useProfile } from '../hooks/useProfile'

import { RequireAuth, RequireActive } from '../components/auth/AuthGuard'
import { TeamFlag } from '../components/ui/TeamFlag'
import { useUserPredictions } from '../hooks/useUserPredictions'
import { useUserBonusPoints } from '../hooks/useUserBonusPoints'
import { BONUS_LABELS, formatBonusDetail } from '../utils/bonusConfig'

export function UserPredictionsPage() {
  const { userId } = useParams<{ userId: string }>()
  const { data: profile } = useProfile(userId)
  const { data: preds = [], isLoading } = useUserPredictions(userId)
  const { data: bonusPoints = [], isLoading: isLoadingBonus } = useUserBonusPoints(userId)

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

  const earnedBonuses = useMemo(
    () => bonusPoints.filter(b => b.points_earned > 0),
    [bonusPoints]
  )

  const extraPoints = useMemo(
    () => earnedBonuses.reduce((sum, b) => sum + b.points_earned, 0),
    [earnedBonuses]
  )

  return (
    <RequireAuth>
      <RequireActive>
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <h1 className="text-xl font-bold text-white italic">
            Predicciones de {profile?.display_name ?? '...'}
          </h1>

          <div className="card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">Puntos extra</p>
              <span className="text-xl font-bold text-white">
                {extraPoints} pts
              </span>
            </div>

            {isLoadingBonus && (
              <div className="flex justify-center py-2">
                <Loader2 className="animate-spin text-zinc-500" size={18} />
              </div>
            )}

            {!isLoadingBonus && earnedBonuses.length === 0 && (
              <p className="text-xs text-zinc-500">
                Todavía no sumó puntos extra.
              </p>
            )}

            {!isLoadingBonus && earnedBonuses.length > 0 && (
              <ul className="space-y-1.5 pt-1 border-t border-zinc-800">
                {earnedBonuses.map(bonus => {
                  const detailText = formatBonusDetail(bonus.bonus_type, bonus.detail)

                  return (
                    <li
                      key={bonus.id}
                      className="flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="text-zinc-200">
                          {(BONUS_LABELS[bonus.bonus_type] ?? bonus.bonus_type)
                            .charAt(0)
                            .toUpperCase() +
                            (BONUS_LABELS[bonus.bonus_type] ?? bonus.bonus_type).slice(1)}
                        </p>
                        {detailText && (
                          <p className="text-[11px] text-zinc-500">{detailText}</p>
                        )}
                      </div>
                      <span className="text-zinc-300 font-semibold tabular-nums">
                        +{bonus.points_earned}
                      </span>
                    </li>
                  )
                })}
              </ul>
            )}
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
                  <div key={pred.id} className="card p-3 flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 text-center">
                      <p className="text-[11px] text-text-muted">
                        #{m.match_number}
                      </p>
                      {m.group ? (
                        <span className="badge-primary text-[9px]">
                          G{m.group.name}
                        </span>
                      ) : (
                        <span className="badge bg-accent/20 text-zinc-200 text-[9px]">
                          {m.phase.name.substring(0, 3)}
                        </span>
                      )}
                    </div>

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
                              <span className="text-[10px]">Esperando</span>
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
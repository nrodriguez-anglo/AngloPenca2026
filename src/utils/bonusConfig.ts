export const BONUS_LABELS: Record<string, string> = {
  podio_exacto: 'Podio exacto',
  podio_presencia: 'Presencia en el podio',
  empates_grupos: 'Empates en fase de grupos',
  rango_goles: 'Rango de goles del torneo',
  final_cero: 'Final 0–0',
  top_scorer_team: 'Equipo del goleador',
  top_group_goals: 'Grupo con más goles',
}

export function formatBonusDetail(bonusType: string, detail: Record<string, unknown> | null) {
  if (!detail) return null

  if (bonusType === 'empates_grupos' && 'actual' in detail && 'predicted' in detail) {
    return `Predijiste ${detail.predicted}, hubo ${detail.actual}`
  }

  return null
}
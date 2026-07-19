import { useQuery } from '@tanstack/react-query'
import { getBonusPointsByUser } from '../services/leaderboardService'

export function useUserBonusPoints(userId?: string) {
  return useQuery({
    queryKey: ['bonus-points', userId],
    queryFn: () => getBonusPointsByUser(userId!),
    enabled: !!userId,
  })
}
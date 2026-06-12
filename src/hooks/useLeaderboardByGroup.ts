import { useQuery } from '@tanstack/react-query'
import { getLeaderboardByGroup } from '../services/leaderboardService'

export function useLeaderboardByGroup(userType?: string) {
  return useQuery({
    queryKey: ['leaderboard-group', userType],
    queryFn: () => getLeaderboardByGroup(userType!),
    enabled: !!userType,
  })
}
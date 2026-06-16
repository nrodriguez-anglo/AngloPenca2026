import { useQuery } from '@tanstack/react-query'
import { fetchUserPredictions } from '../services/predictionService'

export function useUserPredictions(userId?: string) {
  return useQuery({
    queryKey: ['user-predictions', userId],
    queryFn: () => fetchUserPredictions(userId!),
    enabled: !!userId,
    staleTime: 60_000,
  })
}
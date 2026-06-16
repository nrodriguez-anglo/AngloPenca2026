import { useQuery } from '@tanstack/react-query'
import { fetchProfile } from '../services/profileService'

export function useProfile(userId?: string) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchProfile(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  })
}
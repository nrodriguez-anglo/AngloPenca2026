import { supabase } from '../lib/supabase'
import type { LeaderboardEntry } from '../types'

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('rank')
  if (error) throw error
  return (data ?? []) as LeaderboardEntry[]
}

export async function getLeaderboardByGroup(
  userType: string
): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('leaderboard_by_group')
    .select('*')
    .eq('user_type', userType)
    .order('total_points', { ascending: false })

  if (error) throw error

  return (data ?? []).map((row, index) => ({
    ...row,
    rank: index + 1,
  }))
}
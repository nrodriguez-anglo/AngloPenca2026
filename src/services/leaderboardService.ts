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

  const rows = (data ?? []) as LeaderboardEntry[]

  const rankedEntries: LeaderboardEntry[] = []

  let currentRank = 1

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]

    if (
      i > 0 &&
      row.total_points !== rows[i - 1].total_points
    ) {
      currentRank = i + 1
    }

    rankedEntries.push({
      ...row,
      rank: currentRank,
    })
  }

  return rankedEntries
}
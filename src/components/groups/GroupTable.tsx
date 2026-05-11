import type { GroupStanding } from '../../types'

interface Props {
  standings: GroupStanding[]
  compact?: boolean
  onTeamClick?: (teamId: string) => void
}

// Colores por posición
const positionColors: Record<number, string> = {
  1: 'border-l-2 border-l-primary',       // clasifican directo
  2: 'border-l-2 border-l-primary',
  3: 'border-l-2 border-l-accent/60',     // posible mejor 3ro
  4: 'border-l-2 border-l-transparent',
}

export function GroupTable({ standings, compact = false, onTeamClick }: Props) {
  if (standings.length === 0) {
    return (
      <div className="py-6 text-center text-text-muted text-sm">
        Sin datos de posiciones
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-zinc-500 text-xs uppercase tracking-wide border-b border-border">
            <th className="text-left pb-2 pl-3 w-6">#</th>
            <th className="text-left pb-2 pl-2">Equipo</th>
            <th className="text-center pb-2 px-2">PJ</th>
            {!compact && (
              <>
                <th className="text-center pb-2 px-2">PG</th>
                <th className="text-center pb-2 px-2">PE</th>
                <th className="text-center pb-2 px-2">PP</th>
                <th className="text-center pb-2 px-2">GF</th>
                <th className="text-center pb-2 px-2">GC</th>
              </>
            )}
            <th className="text-center pb-2 px-2">GD</th>
            <th className="text-center pb-2 px-2 font-bold text-zinc-700">PTS</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row) => (
            <tr
              key={row.team_id}
              onClick={() => onTeamClick?.(row.team_id)}
              className={`${positionColors[row.position]} transition-colors ${
                onTeamClick ? 'cursor-pointer hover:bg-zinc-200' : 'hover:bg-zinc-200'
              }`}
            >
              <td className="py-2 pl-3 text-zinc-400 text-xs">{row.position}</td>

              {/* Equipo: bandera + nombre */}
              <td className="py-2 pl-2">
                <div className="flex items-center gap-2">
                  {row.team_flag_url ? (
                    <img
                      src={row.team_flag_url}
                      alt={row.team_abbreviation}
                      className="w-5 h-4 rounded-sm object-cover flex-shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-5 h-4 rounded-sm bg-border flex-shrink-0" />
                  )}
                  <span className="text-zinc-600 text-xs font-medium truncate max-w-[120px]">
                    {row.is_confirmed
                      ? row.team_name
                      : (row.placeholder_name ?? row.team_name)
                    }
                  </span>
                </div>
              </td>

              <td className="py-2 px-2 text-center text-zinc-400">{row.pj}</td>

              {!compact && (
                <>
                  <td className="py-2 px-2 text-center text-zinc-400">{row.pg}</td>
                  <td className="py-2 px-2 text-center text-zinc-400">{row.pe}</td>
                  <td className="py-2 px-2 text-center text-zinc-400">{row.pp}</td>
                  <td className="py-2 px-2 text-center text-zinc-400">{row.gf}</td>
                  <td className="py-2 px-2 text-center text-zinc-400">{row.gc}</td>
                </>
              )}

              <td className="py-2 px-2 text-center text-zinc-400">
                {row.gd > 0 ? `+${row.gd}` : row.gd}
              </td>
              <td className="py-2 px-2 text-center font-bold text-zinc-400">{row.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Leyenda */}
      {!compact && (
        <div className="flex items-center gap-4 mt-3 px-1 text-[10px] text-zinc-600">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            Clasifican directo
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-zinc-400 inline-block" />
            Posible mejor 3ro
          </span>
        </div>
      )}
    </div>
  )
}

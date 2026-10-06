import type { Project } from '../data/projects'

interface Props { project: Project; index: number; total: number }

export default function ProjectCard({ project, index, total }: Props) {
  return (
    <div className="flex-none w-[300px] relative group cursor-default">

      {/* Thumbnail - hard edges, desaturated until hover */}
      <div className="relative w-full h-[190px] overflow-hidden transition-colors duration-300" style={{ background:'var(--card-media-bg)' }}>
        <img src={project.image} alt={`${project.name} screenshot`}
             className="w-full h-full object-cover object-top grayscale-[0.65] contrast-[1.05] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.045]" />
        <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
             style={{ background:'var(--card-overlay)' }} />

        {/* Index */}
        <span className="absolute top-3 left-3 text-[10px] tracking-[.15em] transition-colors"
              style={{ color:'var(--card-index)', fontFamily:'DM Mono,monospace' }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Status */}
        <span className="absolute top-3 right-3 flex items-center gap-1.5 text-[9px] tracking-[.15em] uppercase"
              style={{ color: project.status === 'live' ? 'var(--accent)' : 'var(--muted)', fontFamily:'DM Mono,monospace' }}>
          <span className="w-[5px] h-[5px] transition-colors" style={{ background: project.status === 'live' ? 'var(--accent)' : 'var(--muted)' }} />
          {project.status === 'live' ? 'Live' : 'WIP'}
        </span>

        {/* Growing hairline on hover */}
        <span className="absolute bottom-0 left-0 h-[2px] w-0 transition-[width] duration-500 ease-out group-hover:w-full"
              style={{ background:'var(--accent)' }} />
      </div>

      {/* Body - no card box, just a hairline rule under the image */}
      <div className="pt-4 transition-colors duration-300" style={{ borderTop:'1px solid var(--border)' }}>
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <div className="text-[16px] font-bold tracking-[-0.01em] transition-colors"
               style={{ fontFamily:'"Playfair Display",serif', color:'var(--fg)' }}>
            {project.name}
          </div>
          <span className="text-[10px] tracking-[.1em] uppercase mt-1 transition-colors"
                style={{ color:'var(--muted)', fontFamily:'DM Mono,monospace' }}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        <div className="text-[12px] leading-[1.65] font-light mb-3 transition-colors" style={{ color:'var(--muted)' }}>
          {project.desc}
        </div>
        <div className="text-[10px] tracking-[.06em] mb-3.5 uppercase transition-colors"
             style={{ color:'var(--stack-tag)', fontFamily:'DM Mono,monospace' }}>
          {project.stack.join('  /  ')}
        </div>
        <div className="flex gap-4">
          {[['GitHub ↗', project.github], ['Live Demo ↗', project.demo]].map(([label, href]) => (
            <a key={label} href={href}
               target={href !== '#' ? '_blank' : undefined}
               rel={href !== '#' ? 'noopener noreferrer' : undefined}
               onClick={href === '#' ? e => e.preventDefault() : undefined}
               className={`text-[11px] tracking-[.04em] no-underline transition-colors ${href === '#' ? 'opacity-40 cursor-default' : ''}`}
               style={{ color:'var(--muted)', fontFamily:'DM Mono,monospace' }}
               onMouseEnter={e => {
                 if (href !== '#') e.currentTarget.style.color = 'var(--accent)'
               }}
               onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
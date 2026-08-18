import { useState } from 'react';
import type { PortfolioContent, Project } from '../data/types';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

interface Props {
  content: PortfolioContent;
}

export default function Projects({ content }: Props) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <SectionHeader num="05" title="Projects" />

        <div className="grid md:grid-cols-2 gap-6">
          {content.projects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </section>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
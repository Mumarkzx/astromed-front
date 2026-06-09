export type Integrante = {
  id: number;
  nome: string;
  rm: string;
  turma: string;
  github: string;
  linkedin: string;
  foto: string;
  bio: string;
  habilidades: string[];
};

export const integrantes: Integrante[] = [
  {
    id: 1,
    nome: "Murilo Marques Cabral",
    rm: "568224",
    turma: "1TDSPB",
    github: "https://github.com/Mumarkzx",
    linkedin: "https://www.linkedin.com/in/murilo-marques-64603a1b9/",
    foto: "/img/foto_murilo.jpeg",
    bio: "Desenvolvedor Full Stack",
    habilidades: ["React", "TypeScript", "Java", "Oracle", "Python"]
  },
  {
    id: 3,
    nome: "Paulo Henrique Kian",
    rm: "563343",
    turma: "1TDSPB",
    github: "https://github.com/PhKian",
    linkedin: "https://www.linkedin.com/in/paulo-henrique-oliveira-3b4b621b2/",
    foto: "/img/foto_ph.jpeg",
    bio: "Desenvolvedor Full Stack",
    habilidades: ["Java", "SQL", "Cloud Computing", "Docker", "Git"]
  }
];
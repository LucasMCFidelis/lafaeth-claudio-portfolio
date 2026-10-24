import "server-only";

import { ProjectRow } from "./map-to-project";

const WIX = "https://static.wixstatic.com/media/cf6a75_";
const CREATED_AT = "2026-10-23";

const projectId = (n: number) => `00000000-0000-4000-8000-0000000000${n}0`;

const images = (
  project: number,
  list: Array<[title: string, file: string, visible?: boolean]>
): ProjectRow["images"] =>
  list.map(([title, file, visible = true], index) => ({
    id: `00000000-0000-4000-8000-0000000${project}${String(index).padStart(4, "0")}`,
    projectId: projectId(project),
    title,
    imageUrl: `${WIX}${file}`,
    visibleInProject: visible,
    index,
    createdAt: CREATED_AT,
  }));

export const mockProjects: ProjectRow[] = [
  {
    id: projectId(1),
    slug: "marca-hippie-artesanatos",
    title: "Ilustrador - Marca Hippie Artesanatos",
    description:
      "Ilustrações desenvolvidas para a vaga de Designer Junior da @hippieartesanatos, buscando apresentar os conhecimentos e habilidades demandadas pela marca.",
    projectType: "Designer e Ilustrador",
    startDate: "2025-04-01",
    endDate: null,
    visibleInProjects: true,
    index: 0,
    images: images(1, [
      ["Post no Instagram", "9338d925e41044c7be87dabc1edc63d1~mv2.jpg"],
      ["Paleta", "ee68f2e5bb174092a42b66a48d6153fb~mv2.jpg"],
      ["Cores", "6723571ae41a45e9a04f9b6c4c7cf986~mv2.jpg"],
      ["Rascunho", "d1c42b55482d45ad8e08999d624d9360~mv2.jpg"],
      ["Rascunho 06", "50d418ad19d2468f9e0cfafa3aa05abd~mv2.jpg", false],
      ["Ilustração e aplicação", "746b0c1da7be464a80547e4969c5922e~mv2.jpg"],
      ["Ilustração 03", "46f2ab29a76c41b7a9846c091115da74~mv2.jpg"],
      ["Ilustração 02", "111cd51e837443a59a4a54311baa7d5e~mv2.jpg"],
      ["Ilustração 01", "aa53098b6a934fc990193bf14eeaa898~mv2.jpg"],
      ["Camisa", "10de69d1b9ab492898508c2394a536fa~mv2.jpg"],
      ["Cartão", "49a672e0c83a48198b8ea331f1de3f7f~mv2.jpg"],
      ["Cartão 03", "4d39b187040d44ea8131e7da6360dab3~mv2.jpg"],
      ["Camisa 03", "4759a9186cec4b7395a3d6a0a0a310ba~mv2.jpg"],
      ["Camisa 02", "19cc0eab01e3457f8ef272a703386dab~mv2.jpg"],
      ["Cartão 02", "3a76bf144b274445bf1841b8383c338b~mv2.jpg"],
      ["Ímãs", "b3ba048a2a7a4fedbd82e6585748f960~mv2.jpg"],
    ]),
  },
  {
    id: projectId(2),
    slug: "social-media",
    title: "Social Media",
    description:
      "Gerenciamento e desenvolvimento de postagens.\nInterações com o público.",
    projectType: "Social Media",
    startDate: "2022-03-01",
    endDate: "2022-08-01",
    visibleInProjects: true,
    index: 1,
    images: images(2, [
      ["Chamada para entrevista", "9728ae8f5fbc449e83245f3d62c1a5d9~mv2.png"],
      ["Post 01", "b0143dde14b04403ababda0d2f1e0293~mv2.png"],
      ["Capa", "4d2813ca78364b5c88b6ad498f355d2e~mv2.png"],
      ["Post 04", "a72919f069a64b0eaf6234bd70415b33~mv2.png"],
      ["Post 02", "9bae94f207734052a7787888b6bfc323~mv2.png"],
      ["Página 3", "7e2f07a35ad24014822e8c057386dab8~mv2.png"],
      ["Página 4", "3ad73308e9ed4f1c91e2ad067a91db03~mv2.png"],
      ["Página 2", "3d3feffbbb614e28a22b875c274722a5~mv2.png"],
      ["Página 5", "0c0eca7e46234d459aaed467fc9e33b8~mv2.png"],
      ["Aniversário", "09f6c40e75684c5180945fbb2b272b80~mv2.jpg"],
      ["Dr.", "7a9e0bd28ab849208ae577a381472721~mv2.jpg"],
      ["Pollin", "a68caf4d8d514cde91dbde8e3124760f~mv2.jpg"],
      ["BBB", "db106bbae80d4efab73f27eea6d1a9fc~mv2.jpg"],
    ]),
  },
  {
    id: projectId(3),
    slug: "design-de-superficie",
    title: "Design de Superfície",
    description:
      "Trabalho desenvolvido na disciplina “Design de Superfície”, ministrada pela Prof. Dra. Nathalie Mota. A atividade consistia na retirada de formas básicas e cores de alguma referencia (Eventos semiapocalípticos - Gabriela), desenvolvimento de um padrão.",
    projectType: "Design de Superfície",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    visibleInProjects: true,
    index: 2,
    images: images(3, [
      ["Padrão final", "5c2b80a09ebf4599a9c4cee490b7e292~mv2.png"],
      ["Padrão 1", "2b9c2e77e3494d1abd46ffe5a6136da0~mv2.png"],
      ["Padrão 2", "b4c1a483d48f47efab279985a9e4e268~mv2.png"],
      ["Touca", "77c460d8b2f4489180f819925756c2c7~mv2.jpg"],
      ["Sacola", "31da62b8571045a18c44715fd2dcf858~mv2.jpg"],
      ["Camisa", "27d5685e4281475dac83fae745f7e7a4~mv2.jpg"],
      ["Calça", "0acc045500cb4ce3b9d04c3971520542~mv2.jpg"],
      ["Padrão 3", "09fa03c45dfd431d84e3cc8481cba611~mv2.png"],
      ["Padrão 4", "4f777967862f4cd0b41e891856237c75~mv2.png"],
      ["Padrão 5", "56a2133439b2453689f3ee3a472890a2~mv2.png"],
      ["Padrão 6", "c476f2a669a44207aa1a4297cf69e387~mv2.png"],
      ["Padrão 7", "9e60c0f918434bf494853c37c06f456b~mv2.png"],
      ["Padrão 8", "88ca4bc273fe402399cf9f489e295391~mv2.png"],
      ["Padrão 9", "3c68669896f94822b2420b932752510f~mv2.png"],
      ["Skate", "dd7f8e52859e44f1986b7056a444a780~mv2.jpg"],
    ]),
  },
  {
    id: projectId(4),
    slug: "idv-bocadas",
    title: "IDV Bocadas",
    description:
      "O processo foi composto por briefing, pesquisa de mercado, posicionamento, desenvolvimento criativo do projeto e entrega.",
    projectType: "Design de Marcas",
    startDate: "2024-10-01",
    endDate: null,
    visibleInProjects: true,
    index: 3,
    images: images(4, [
      ["Marca Bocadas", "5d21af4922fe444bac768984cd85c2e3~mv2.png"],
      ["Post 02", "13885d7b700d4ea28e8b00ae178670f5~mv2.png"],
      ["Cartaz vertical", "fb1d738948e24db391fef62ef8100f9f~mv2.png"],
      ["Bandeira", "66d01545f10647839a46561417f140cc~mv2.png"],
      ["Camisa amarela", "2281dd4db855448d9773ccfa65e4ea79~mv2.png"],
      ["Cardápio", "d6d823b050704fc5a5a2279ef8af88ec~mv2.png"],
      ["Lambe-lambe", "3d8178a1c81842209758c4120424cd3e~mv2.png"],
    ]),
  },
  {
    id: projectId(5),
    slug: "extensao-peasa",
    title: "Extensão PEASA",
    description: "Em atualização.",
    projectType: "Designer e Ilustrador",
    startDate: "2023-01-01",
    endDate: null,
    visibleInProjects: true,
    index: 4,
    images: images(5, [
      ["Cartaz da confraternização", "5ecf59828a664df38e32b1bbac3add0a~mv2.png"],
    ]),
  },
  {
    id: projectId(6),
    slug: "design-de-superficie-embalagem",
    title: "Design de Superfície - Embalagem",
    description: "Ainda em desenvolvimento.",
    projectType: "Design de Superfície e Embalagem",
    startDate: "2024-04-01",
    endDate: null,
    visibleInProjects: true,
    index: 5,
    images: images(6, [
      ["Kit Mini Colônias", "d24ff9e6450c404b9649f97e47289c49~mv2.jpg"],
    ]),
  },
  {
    id: projectId(7),
    slug: "projeto-oculto",
    title: "Projeto oculto",
    description: "Não deve aparecer no site.",
    projectType: null,
    startDate: "2021-01-01",
    endDate: null,
    visibleInProjects: false,
    index: 6,
    images: images(7, [
      ["Imagem oculta", "9728ae8f5fbc449e83245f3d62c1a5d9~mv2.png"],
    ]),
  },
];

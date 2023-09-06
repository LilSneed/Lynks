interface ClusterData {
  id: number;
  creatorId: number;
  authId: string;
  image: string;
  url: string;
  title: string;
  description: string;
  lynks: Array<any>;
  relatedClusters: Array<any>;
  content: string;
}

type SubmitHandler = (data: z.infer<typeof formSchema>) => void;

interface Node {
  id: string;
  group: number;
}

interface Link {
  value: number;
  source: string;
  target: string;
}

interface dataObject {
  nodes: Node[];
  links: Link[];
}

interface ParentClusters {
  belongsToClusters?: {
    id: number;
    creatorId: number;
    authId: string;
    image: string;
    url: string;
    title: string;
    description: string;
  }[];
  relatedClusters?: {
    id: number;
    creatorId: number;
    authId: string;
    image: string;
    url: string;
    title: string;
    description: string;
  }[];
}

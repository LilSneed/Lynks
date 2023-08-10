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
}

type SubmitHandler = (data: z.infer<typeof formSchema>) => void;

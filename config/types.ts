export type projectDetailType = {
  config: any;
  createdOn: string;
  device: string;
  id: number;
  projectId: string;
  userId: string;
  userInput: string;
  projectName?:string;
};

export type screenConfigType = {
  id: number;
  projectId: string;  
  screenId:string;
  screenName:string;
  porpose:string;
  screenDescription:string;
  code:string;
};
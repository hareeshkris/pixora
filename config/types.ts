export type projectDetailType = {
  config: any;
  createdOn: string;
  device: string;
  id: number;
  projectId: string;
  userId: string;
  userInput: string;
  projectName?:string;
  projectVisualDescription?:string;
  theme?:string;
};

export type screenConfigType = {
  id: number;
  projectId: string;  
  screenId:string;
  screenName:string;
  purpose:string;
  screenDescription:string;
  code:string;
};
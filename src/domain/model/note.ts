export default interface Note {
    id: string;
    title: string;
    content?: string;
    groupName?: string;
    isPinned?: boolean;
  }
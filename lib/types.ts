// Types for Learnosity Items API
export interface ItemsAPIRequest {
  user_id: string;
  session_id: string;
  activity_id: string;
  name: string;
  rendering_type: string;
  type: string;
  config: {
    time: {
      max_time: number;
      limit_type: string;
      show_pause: boolean;
      show_time: boolean;
    };
  };
  items: string[];
}

export interface ItemsAPIResponse {
  security: string;
  request: string;
}

// Types for Learnosity Author API
export interface AuthorAPIRequest {
  mode: string;
  reference: string;
  user: {
    id: string;
    email: string;
  };
}

export interface AuthorAPIResponse {
  security: string;
  request: string;
}

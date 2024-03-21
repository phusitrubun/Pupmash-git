export interface ImageGetResponse {
    imageID:    number;
    url:        string;
    updateDate: string;
    uploadDate: string;
    name:       string;
    score:      number;
    userID:     number;
}

export interface ImageUserUpload {
    userID:     number;
    name:       string;
    bio:        string;
    email:      string;
    password:   string;
    image:      string;
    type:       number;
    imageID:    number;
    url:        string;
    updateDate: string;
    uploadDate: string;
    score:      number;
}


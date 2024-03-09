export interface VoteResponse {
    userID:   string;
    imageID:  number;
    voteDate: string;
    winner:   number;
    loserID:  number;
}

export interface StatisticResponse {
    imageID:    number;
    url:        string;
    updateDate: string;
    uploadDate: string;
    name:       string;
    score:      number;
    userID:     number;
    ScoreArray: string;
    Date:       string;
}

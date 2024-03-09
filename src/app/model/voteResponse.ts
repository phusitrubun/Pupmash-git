export interface VoteResponse {
    userID:   string;
    imageID:  number;
    voteDate: string;
    winner:   number;
    loserID:  number;
}

export interface StatisticResponse {
    // sid:      number;
    score:    number;
    DateTime: string;
    imageID:  number;
}

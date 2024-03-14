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

export interface Rank {
isNewData: any;
showScore: any;
isSameRank: any;
isNegative: any;
  currentRank: number;
  currentScore: any;
  imageID:         number;
  url:             string;
  name:            string;
  score:           number;
  userID:          number;
  today_score:     number;
  today_rank:      number;
  yesterday_score: number;
  yesterday_rank:  number;
}

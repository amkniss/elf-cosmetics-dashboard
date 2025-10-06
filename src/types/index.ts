export interface BrandData {
  color: string;
}

export interface CompetitiveData {
  radar: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
      pointBackgroundColor: string;
    }>;
  };
  bar: {
    social: { labels: string[]; values: number[]; title: string };
    sentiment: { labels: string[]; values: number[]; title: string };
    price: { labels: string[]; values: number[]; title: string };
  };
}

export interface ConsumerTopic {
  text: string;
  size: number;
  category: string;
}

export interface ConsumerFAQ {
  q: string;
  a: string;
  category: string;
}

export interface ConsumerData {
  topics: ConsumerTopic[];
  faqs: ConsumerFAQ[];
}

export interface Opportunity {
  label: string;
  x: number;
  y: number;
  r: number;
  backgroundColor: string;
}

export interface Recommendation {
  title: string;
  content: string;
}

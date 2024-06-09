import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";
const generateMCQ = (
  meaning: {
    Text: string;
  }[],
  idx: number
): string[] => {
  const correctAns: string = meaning[idx].Text;
  const incorrectArray = meaning.filter((i) => i.Text !== correctAns);
  const incorrectOptions: string[] = _.sampleSize(incorrectArray, 3).map(
    (i) => i.Text
  );
  const mcqOptions = _.shuffle([...incorrectOptions, correctAns]);
  return mcqOptions;
};
export const translateWords = async (params: string): Promise<WordType[]> => {
  try {
    let words = generate(8);
    // console.log(params);
    const translatekey = import.meta.env.VITE_MICROSOFT_KEY

    if (typeof words === "string") {
      words = [words];
    }

    const formattedWords = words.map((word) => ({ Text: word }));
    // console.log(formattedWords);
    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      formattedWords,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "x-rapidapi-key":translatekey,
          "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );

    const receive: FetchedDataType[] = response.data;
    const arr: WordType[] = receive.map((i, index) => {
      const options: string[] = generateMCQ(formattedWords, index);
      return {
        word: i.translations[0].text,
        meaning: formattedWords[index].Text,
        options,
      };
    });
    return arr;
  } catch (error) {
    console.log(error);
    // throw new Error("Some error");
    return [];
  }
};

export const countMatchingELements = (
  arr1: string[],
  arr2: string[]
): number => {
  if (arr1.length !== arr2.length) throw new Error("Arrays are not equal");
  let matchingCount = 0;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) matchingCount++;
  }

  return matchingCount;
};

export const fetchAudio = async (
  text: string,
  language: LangType
): Promise<string> => {
  try {
    const key = import.meta.env.VITE_TEXT_TO_SPEECH_API;
    const rapidKey = import.meta.env.VITE_RAPID_API;

    const encodedParams = new URLSearchParams({
      src: text,
      r: "0",
      c: "mp3",
      f: "8khz_8bit_mono",
      b64: "true",
    });

    if (language === "ja") encodedParams.set("hl", "ja-jp");
    else if (language === "es") encodedParams.set("hl", "es-es");
    else if (language === "fr") encodedParams.set("hl", "fr-fr");
    else encodedParams.set("hl", "hi-in");

    const { data }: { data: string } = await axios.post(
      "https://voicerss-text-to-speech.p.rapidapi.com/",
      encodedParams.toString(),
      {
        params: { key },
        headers: {
          "x-rapidapi-key": rapidKey,
          "x-rapidapi-host": "voicerss-text-to-speech.p.rapidapi.com",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    return "";
  }
};


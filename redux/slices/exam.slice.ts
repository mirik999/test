import { createSlice } from "@reduxjs/toolkit";
import { ExamStatisticsType } from "../types/stores.type";

const initialState: ExamStatisticsType = {
  type: "Klassik",
  difficulty: "",
  language: "",
  subject: "",
  passedTests: [],
};

const exam = createSlice({
  name: "exam",
  initialState,
  reducers: {
    startExam(state, action) {
      return {
        type: action.payload.type,
        difficulty: action.payload.difficulty,
        language: action.payload.language,
        subject: action.payload.subject,
        passedTests: [],
      };
    },
    pushAnswer(state, action) {
      state.passedTests.push(action.payload.answer);
      return state;
    },
    cleanExam() {
      return initialState;
    },
  },
});

export const { pushAnswer, cleanExam, startExam } = exam.actions;
export default exam.reducer;

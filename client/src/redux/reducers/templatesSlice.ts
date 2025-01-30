import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { templatesAPI } from "../../api/api";

const templatesSlice = createSlice({
  name: "templates",
  initialState: {
    search: "",
    page: 1,
    templates: [],
    meta: {
      current: 1,
      next: 1,
      prev: 1,
      total: 1,
    },
    isFetching: false,
    error: null,
  },
  reducers: {
    setTemplates: (state, action) => {
      state.templates = action.payload;
    },
    setMeta: (state, action) => {
      state.meta = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getTemplates async thunk
      .addCase(getTemplates.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getTemplates.fulfilled, (state, action) => {
        state.isFetching = false;
        state.templates = action.payload.templates;
        state.meta = action.payload.meta;
      })
      .addCase(getTemplates.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })

      // Handle addTemplate async thunk
      .addCase(addTemplate.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(addTemplate.fulfilled, (state, action) => {
        state.isFetching = false;
        // Handle the added template if needed
      })
      .addCase(addTemplate.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      });
  },
});

export const getTemplates = createAsyncThunk(
  "templates/getTemplates",
  async ({ page, search }, { rejectWithValue }) => {
    try {
      const data = await templatesAPI.getTemplates(page, search);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addTemplate = createAsyncThunk(
  "templates/addTemplate",
  async (_, { rejectWithValue }) => {
    try {
      const data = await templatesAPI.addTemplate();
      const templateId = data.template.id;

      return templateId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const { setSearch, setPage } = templatesSlice.actions;

export default templatesSlice.reducer;

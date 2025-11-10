import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/client'

export const fetchMe = createAsyncThunk('auth/me', async () => {
  const { data } = await api.get('/auth/me')
  return data.user
})

export const login = createAsyncThunk('auth/login', async (payload) => {
  const { data } = await api.post('/auth/login', payload)
  return data.user
})

export const register = createAsyncThunk('auth/register', async (payload) => {
  const { data } = await api.post('/auth/register', payload)
  return data.user
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await api.post('/auth/logout')
})

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle' },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchMe.fulfilled, (s, a) => { s.user = a.payload })
     .addCase(login.fulfilled, (s, a) => { s.user = a.payload })
     .addCase(register.fulfilled, (s, a) => { s.user = a.payload })
     .addCase(logout.fulfilled, (s) => { s.user = null })
  }
})

export default slice.reducer

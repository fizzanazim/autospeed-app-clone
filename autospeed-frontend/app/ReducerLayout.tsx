'use client'

import React from 'react'
import { Provider } from 'react-redux';
import Store from './Redux/Store';

export const ReducerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    
    <Provider store = {Store}>
        {children}
    </Provider>

  )
}

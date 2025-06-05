/* eslint-disable markel-plugin/layer-imports */
import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'

import { ReducersMapObject } from '@reduxjs/toolkit'

import i18nForTests from '@/shared/config/i18n/i18nForTests'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'

import '../../../app/styles/index.scss'
interface componentRenderOptions {
  route?: string
  /**
   * DeepPartial для того, чтобы использовать определенные участки для тестирования, а не перечислять весь стейт */
  initialState?: DeepPartial<StateSchema>
  /**
   * Для тех случаев, когда тестирую какой-то вложенный компонент, а initialState монтируется в родительский компонент */
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

interface TestProviderProps {
  children: ReactNode
  options?: componentRenderOptions
}

/**
 * Для e2e тестов */
export function TestProvider(props: TestProviderProps) {
  const { children, options = {} } = props
  const { route = '/', initialState, asyncReducers } = options
  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider>
            <div className="app">{children}</div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}

export function componentRender(
  component: ReactNode,
  options: componentRenderOptions = {}
) {
  return render(<TestProvider options={options}>{component}</TestProvider>)
}

import type {
  HookProps,
  HTMLElements,
  Directory,
  HookReturnResult,
} from './types'

export function createHook<
  Element extends HTMLElements,
  Props extends Directory,
  State extends Directory,
>(
  hook: (props: HookProps<Element, Props>) => HookReturnResult<Element, State>,
): <T extends HTMLElements = Element>(
  props: HookProps<T, Props>,
) => HookReturnResult<T, State>
export function createHook<Hook extends (...args: any[]) => any>(
  hook: (...args: any[]) => ReturnType<Hook>,
): Hook
export function createHook(hook: any) {
  return hook
}

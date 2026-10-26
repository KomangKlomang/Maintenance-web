import { Checkbox } from '@heroui/react'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof Checkbox>

/** HeroUI v3: checkbox tanpa Content/Control/Indicator tidak terlihat di DOM. */
export function TableCheckbox({ className, ...props }: Props) {
  return (
    <Checkbox className={cn('inline-flex shrink-0', className)} {...props}>
      <Checkbox.Content>
        <Checkbox.Control className="size-[1.125rem] border-border data-[selected]:border-blue-600 data-[selected]:bg-blue-600">
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox.Content>
    </Checkbox>
  )
}

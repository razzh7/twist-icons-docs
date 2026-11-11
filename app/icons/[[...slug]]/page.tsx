'use client'
import { Fragment, ReactElement } from 'react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { IconsNav } from '@/components/nav/icons-nav'
import { useIcons, useModal } from '@/hooks'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/modal'
import type { IconType } from '@twistify/react-icons'
import style from '../index.module.css'

interface IconPageProps {
  params: {
    slug: string[]
  }
}

export default function IconPage({ params }: IconPageProps) {
  const [id] = params.slug
  const { icons, total, ready, max, setMax, searchParams, categories, handleSearch, currentPath } = useIcons(id)
  const { open, setOpen, openModal, prefixId, iconName, ActiveIcon } = useModal()

  return (
    <div className="w-full h-full max-h-full grid grid-rows-[max-content,1fr] overflow-hidden">
      <div className="px-6 pt-4 pb-2">
        <div className="flex justify-between mb-4">
          {
            id === 'all' ? (
              <h1 className="text-2xl">All</h1>
            ) : (
              <div>
                <div className="text-2xl">{categories?.name}</div>
                <div className="text-sm">{categories?.total} Icons</div>
                <div className="text-sm opacity-50 hover:opacity-100">
                  <a href={categories?.projectUrl} target="_blank">
                    Author {categories?.author}
                  </a>
                </div>
                <div className="text-sm opacity-50 hover:opacity-100">
                  <a href={categories?.licenseUrl} target="_blank">
                    License {categories?.license}
                  </a>
                </div>
              </div>
            )
          }
          <IconsNav />
        </div>
        <Input
          className="focus-visible:ring-0"
          placeholder="Search Icons..."
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('s')?.toString()}
        />
      </div>
      <ScrollArea className="overflow-y-scroll overflow-x-hidden">
        <div className="px-4 pt-2 pb-4 text-center">
          <div className="flex flex-wrap justify-center">
            {
              icons.length ? (
                icons.map(({ prefix, name, Icon }) => (
                  <div
                    className={`${style['icon-item']} box-border flex justify-center items-center p-2 text-xl transition-all cursor-pointer`}
                    key={`${prefix}-${name}`}
                    onClick={() => openModal({ prefix, name, Icon })}
                  >
                    <Icon />
                  </div>
                ))
              ) : ready ? (
                <div className="text-lg">No matched Icons</div>
              ) : (
                <div className="text-lg">Loading icons...</div>
              )
            }
          </div>
          {
            max < total && (
              <Fragment>
                <Button
                  className="mx-2 my-4"
                  variant="secondary"
                  onClick={() => {
                    setMax((preMax) => preMax + 100)
                  }}
                >
                  Load More
                </Button>
                {
                  currentPath !== 'all' && (
                    <Button
                      className="mx-1 my-4"
                      variant="secondary"
                      onClick={() => setMax(total)}
                    >
                      Load All
                    </Button>
                  )
                }
              </Fragment>
            )
          }
        </div>
      </ScrollArea>
      {
        open ? (
          <Modal
            open={open}
            setOpen={setOpen}
            prefix={prefixId}
            name={iconName}
            Icon={ActiveIcon as ReactElement<IconType>}
          />
        ) : null
      }
    </div>
  )
}

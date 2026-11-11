import { IconsManifest } from '@twistify/react-icons'

export const allCategories = () => {
  const rawManifest = IconsManifest.map(({ id, name }) => ({
    key: id,
    name
  })).sort((a, b) => a.name.localeCompare(b.name))

  return [{ key: 'all', name: 'All Icons' }].concat(rawManifest)
}

export const filterCategories = (id: string) => IconsManifest.find(({ id: _id }) => _id === id)

export const allIds = IconsManifest.map(({ id, name }) => ({ id, name }))

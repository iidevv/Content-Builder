import { type Config } from '@measured/puck'
import Divider from './components/puck/Divider'
import Grid from './components/puck/Grid'
import Heading from './components/puck/Heading'
import Image from './components/puck/Image'
import Video from './components/puck/Video'
import Button from './components/puck/Button'
import Spacer from './components/puck/Spacer'
import Card from './components/puck/Card'
import Text from './components/puck/Text'
import Container from './components/puck/Container'

export const config: Config = {
  components: {
    Container,
    Grid,
    Heading,
    Text,
    Image,
    Video,
    Button,
    Divider,
    Spacer,
    Card,
  },
  categories: {
    layout: {
      components: ['Container', 'Grid'],
    },
    basic: {
      components: ['Heading', 'Text', 'Image', 'Video', 'Button', 'Divider', 'Spacer'],
    },
    interactive: {
      components: ['Card'],
    },
  },
}

export default config

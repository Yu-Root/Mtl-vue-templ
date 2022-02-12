import notFound from '../../pages/error/404.vue'
import { mount } from '@vue/test-utils'

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

test('check Text', () => {
  const wrapper = mount(notFound)
  // Assert the rendered text of the component
  expect(wrapper.find('h1').text()).toContain('Not found page5')
})

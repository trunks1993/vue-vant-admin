import { param2Obj } from '@/utils';

const userMap = {
  '18073778398': {
    token: 'abcd1231adfdaavnahfduaa'
  }
}
const tokenMap = {
  abcd1231adfdaavnahfduaa: {
    id: 1,
    role: { id: 1, roleName: "天使", roleType: 0 },
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '穷尽了想象',
    parent: {
      name: "trunks",
      role: { id: 1, roleName: "官方", roleType: 0 },
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    }
  }
}

export default {
  loginByPhone: config => {
    const { phone } = JSON.parse(config.body)
    return {
      success: !!userMap[phone.replace(/\s+/g, '')],
      data: userMap[phone.replace(/\s+/g, '')]
    }
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    return { success: !!tokenMap[token], data: tokenMap[token] }
  },
  logout: () => 'success'
}

import { UserCard } from '../types/userCard'

const Vasya: UserCard = {
  user: 'Vasya',
  login: 'Vasya',
  password: '12345',
  options: [
    {
      name: 'На главной странице отсутствует компонент счетчика',
      isExist: false
    },
    {
      name: 'Нельзя оценить статью',
      isExist: false
    },
    {
      name: 'Нет админ панели',
      isExist: false
    }
  ]
}

const Admin: UserCard = {
  user: 'Admin',
  login: 'admin',
  password: '12345',
  options: [
    {
      name: 'На главной странице отсутствует компонент счетчика',
      isExist: false
    },
    {
      name: 'Есть возможность оценки статьи',
      isExist: true
    },
    {
      name: 'Есть админ панель',
      isExist: true
    }
  ]
}

export const TestUser = {
  user: 'testUser',
  login: 'testUser',
  password: '12345',
  options: [
    {
      name: 'На главной странице есть компонент счетчика',
      isExist: true
    },
    {
      name: 'Есть возможность оценки статьи',
      isExist: true
    },
    {
      name: 'Есть админ панель',
      isExist: true
    }
  ]
}

export const userCards = [Vasya, Admin, TestUser]

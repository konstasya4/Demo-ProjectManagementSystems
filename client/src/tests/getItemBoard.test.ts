// __tests__/getItemBoard.test.ts

import { axiosInstance, getItemBoard } from "../shared/api";
import apiUrls from "../shared/api/apiUrls";

// Мокаем axiosInstance.get
jest.mock("../shared/api/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("getItemBoard(id)", () => {
  const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("должен вызвать axiosInstance.get с правильным URL и вернуть массив задач", async () => {
    const tasksPayload = {
      data: [
        {
          id: 1,
          title: "Создать тест",
          description: "Создание теста",
          priority: "Medium",
          status: "Done",
          assignee: {
            id: 2,
            fullName: "Илья Романов",
            email: "il.romanov@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
          },
        },
        {
          id: 2,
          title: "Адаптация карточки для мобильных устройств",
          description:
            "Адаптация интерфейса для различных разрешений экрана. Детали будут уточнены в процессе разработки.",
          priority: "Low",
          status: "Done",
          assignee: {
            id: 2,
            fullName: "Илья Романов",
            email: "il.romanov@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
          },
        },
        {
          id: 3,
          title: "Оптимизация загрузки медиа-контента",
          description:
            "Оптимизация загрузки и отображения медиа-контента. Детали будут уточнены в процессе разработки.",
          priority: "Medium",
          status: "Done",
          assignee: {
            id: 2,
            fullName: "Илья Романов",
            email: "il.romanov@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
          },
        },
        {
          id: 4,
          title: "Добавление микроанимаций интерфейса",
          description:
            "Реализация нового UI компонента с учетом гайдлайнов дизайн-системы. Детали будут уточнены в процессе разработки.",
          priority: "Low",
          status: "Backlog",
          assignee: {
            id: 1,
            fullName: "Александра Ветрова",
            email: "al.vetrova@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
          },
        },
        {
          id: 5,
          title: "Интеграция с системой рекомендаций",
          description:
            "Адаптация интерфейса для различных разрешений экрана. Детали будут уточнены в процессе разработки.",
          priority: "Low",
          status: "InProgress",
          assignee: {
            id: 1,
            fullName: "Александра Ветрова",
            email: "al.vetrova@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
          },
        },
        {
          id: 6,
          title: "Реализация темной темы",
          description:
            "Оптимизация загрузки и отображения медиа-контента. Детали будут уточнены в процессе разработки.",
          priority: "High",
          status: "Backlog",
          assignee: {
            id: 1,
            fullName: "Александра Ветрова",
            email: "al.vetrova@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
          },
        },
        {
          id: 7,
          title: "Оптимизация CLS (Cumulative Layout Shift)",
          description:
            "Реализация нового UI компонента с учетом гайдлайнов дизайн-системы. Детали будут уточнены в процессе разработки.",
          priority: "Low",
          status: "Backlog",
          assignee: {
            id: 2,
            fullName: "Илья Романов",
            email: "il.romanov@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
          },
        },
        {
          id: 8,
          title: "Адаптация карточки для мобильных устройств",
          description:
            "Адаптация интерфейса для различных разрешений экрана. Детали будут уточнены в процессе разработки.",
          priority: "High",
          status: "Done",
          assignee: {
            id: 2,
            fullName: "Илья Романов",
            email: "il.romanov@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
          },
        },
        {
          id: 9,
          title: "Интеграция системы рейтингов",
          description:
            "Оптимизация загрузки и отображения медиа-контента. Детали будут уточнены в процессе разработки.",
          priority: "Low",
          status: "InProgress",
          assignee: {
            id: 1,
            fullName: "Александра Ветрова",
            email: "al.vetrova@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
          },
        },
        {
          id: 45,
          title: "Создать задачу",
          description: "Необходимо создать задачу",
          priority: "Low",
          status: "Backlog",
          assignee: {
            id: 2,
            fullName: "Илья Романов",
            email: "il.romanov@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
          },
        },
        {
          id: 46,
          title: "Создание",
          description: "Создание",
          priority: "Low",
          status: "Backlog",
          assignee: {
            id: 2,
            fullName: "Илья Романов",
            email: "il.romanov@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
          },
        },
        {
          id: 47,
          title: "nn",
          description: "nn",
          priority: "Low",
          status: "Backlog",
          assignee: {
            id: 2,
            fullName: "Илья Романов",
            email: "il.romanov@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
          },
        },
        {
          id: 48,
          title: "sss",
          description: "sss",
          priority: "Low",
          status: "Backlog",
          assignee: {
            id: 3,
            fullName: "Дмитрий Козлов",
            email: "dm.kozlov@avito.ru",
            avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
          },
        },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: tasksPayload });

    const result = await getItemBoard(1);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(apiUrls.boards.itemBoard(1));

    expect(result).toEqual(tasksPayload);
  });

  it("должен пробросить ошибку, если axiosInstance.get выбрасывает исключение", async () => {
    const fakeError = new Error("Board not found");
    mockedAxios.get.mockRejectedValueOnce(fakeError);

    await expect(getItemBoard(1)).rejects.toThrow("Board not found");
    expect(mockedAxios.get).toHaveBeenCalledWith(apiUrls.boards.itemBoard(1));
  });
});

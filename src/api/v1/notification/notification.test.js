jest.useFakeTimers();

test('check 1 + 2 = 3 from notificaiton', async () => {
    // const user = await userService.getSingleUser('1');
    // console.log(user);
    // expect(user).toEqual(user);

    await expect(1 + 2).toBe(3);
});

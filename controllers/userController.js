export const userList = async (req, res) => {
 try {
    const currentUserId = req.user.id;
    const sentRequests = await FriendRequest.find({ from: currentUserId }).select("to");
    const receivedRequests = await FriendRequest.find({ to: currentUserId }).select("from");

    const blockedUserIds = [
      ...sentRequests.map(r => r.to.toString()),
      ...receivedRequests.map(r => r.from.toString()),
      currentUserId,
    ];

    const users = await register.find({
      _id: { $nin: blockedUserIds },
    }).select("name email");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user list", error });
  }
};

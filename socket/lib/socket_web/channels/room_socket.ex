defmodule Socket.RoomChannel do
  use Phoenix.Channel

  def join("room:" <> private_room_token, _params, _socket) do
    {:ok, %{status: "connection!!"}, socket}
    {:error, %{status: "unauthorized"}}
  end

  def join("room:sample", _messsage, socket) do
    {:ok, socket}
  end
end

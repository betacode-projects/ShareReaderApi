defmodule Socket.RoomChannel do
  use Phoenix.Channel

  def join("room:" <> _public_room_token, _params, socket) do
    {:ok, %{status: "connection!!"}, socket}
    {:error, %{status: "unauthorized"}}
  end

  def join("room:sample", _messsage, socket) do
    {:ok, socket}
  end

  def hundle_in("downloaded_alert", %{"body" => body}, socket) do
    broadcast!(socket, "downloaded_alert", %{body: body})
    {:noreply, socket}
  end
end

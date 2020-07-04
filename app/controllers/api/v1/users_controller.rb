class Api::V1::UsersController < ApiController
  def show
    if params['id'] == 'me'
      show_me()
    else
      render json: User.find(params['id']), serializer: UserShowSerializer
    end
  end

  def update
    if !params[:nick].nil?
      params[:nick].strip!
    end

    @user = current_user
    if @user.nil?
      render json: {
        status: "fail",
        data: { message: "User is not logged in" }
      }
      return
    end

    @user.update(user_params)
    if @user.save
      render json: {
        status: "success",
        data: { user: UserShowSerializer.new(@user).as_json }
      }
    else
      render json: {
        status: "fail",
        data: { errors: @user.errors.full_messages }
      }
    end
  end

  private
  def show_me
    return unless logged_in
    render json: current_user, serializer: UserShowSerializer
  end

  def user_params
    params.require(:user).permit(:nick, :bio)
  end
end

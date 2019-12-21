class Users::SessionsController < Devise::SessionsController
    def new_guest
      user = User.guest
      sign_in user
      redirect_to root_path, notice: 'ゲストユーザーとしてログインしました。'
    rescue ActiveRecord::RecordInvalid => e
      pp e.record&.errors
      redirect_to root_path, alert: 'エラーが発生しました。'
    end
end
require 'test_helper'

class UsuariosControllerTest < ActionController::TestCase
  test "should get publicaciones" do
    get :publicaciones
    assert_response :success
  end

end

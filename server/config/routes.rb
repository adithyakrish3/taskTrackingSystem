Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  	match '*all', to: proc { [204, {}, ['']] }, via: :options
	
	scope '/api' do
		post '/board/new', to: 'board#new_board'
		get '/boards', to: 'board#get_boards'

		post '/list/new', to: 'list#new_list'
		get '/lists/:board_id', to: 'list#fetch_lists'

		post '/tasks/update_association', to: 'task#update_task_association'
		post '/task/new', to: 'task#add_task'
		get '/task/ind/:id', to: 'task#render_task'
		post '/comment/new', to: 'task#add_comments'
		post '/comment/delete', to: 'task#delete_comment'
		post '/task/delete', to: 'task#delete_task'
	end
end

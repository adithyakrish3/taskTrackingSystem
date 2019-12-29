class ListController < ApplicationController
	skip_before_action :verify_authenticity_token

	def fetch_lists
		board = Board.where(id: params[:board_id]).first

		response_hash = Hash.new
		response_hash[:status] = 'success'
		response_hash[:data] = Hash.new
		response_hash[:data][:name] = board.name
		response_hash[:data][:list_data] = []
		lists = List.where(active: true, board_id: board.id)
		lists.each do |list|
			object = Hash.new
			object[:id] = list.id
			object[:name] = list.name
			object[:tasks] = []
			tasks = Task.where(list_id: list.id, active: true)
			tasks.each do |task|
				object_new = Hash.new
				object_new[:id] = task.id
				object_new[:name] = task.name
				object[:tasks] << object_new
			end
			response_hash[:data][:list_data] << object
		end

		render json: response_hash
	end

	def new_list
		puts params
		list = List.new
		list[:name] = params[:name]
		list[:board_id] = params[:board_id]
		list[:active] = true
		if(list.save)
			render json: {status: 'success'}
		else
			render json: {status: 'error'}
		end
	end
end
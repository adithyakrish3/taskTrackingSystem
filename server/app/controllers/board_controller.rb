class BoardController < ApplicationController
	skip_before_action :verify_authenticity_token

	def new_board
		board = Board.new
		board[:name] = params[:name]
		board[:active] = true
		if (board.save)
			render json: {status: 'success'}
		else
			render json: {status: 'error'}
		end
	end

	def get_boards
		boards = Board.where(active: true).order(id: :desc)

		response_hash = Hash.new
		response_hash[:status] = 'success'
		response_hash[:data] = []

		boards.each do |board|
			object = Hash.new
			object[:id] = board.id
			object[:name] = board.name
			object[:active] = board.active
			response_hash[:data] << object
		end

		render json: response_hash
	end
end
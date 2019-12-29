class TaskController < ApplicationController
	skip_before_action :verify_authenticity_token

	def update_task_association
        if (params[:task_id].nil? || params[:list_id].nil?)
            return
        end
		task = Task.where(id: params[:task_id]).first
		if(task.update_attributes(task_assc_update))
			render json: {status: 'success'}
		else
			render json: {status: 'error'}
		end
	end

	def task_assc_update
        params.permit(:list_id)
    end

    def add_task
    	task = Task.new
    	task[:name] = params[:name]
    	task[:description] = params[:description]
    	task[:active] = 1
    	task[:list_id] = params[:list_id]
    	if(task.save)
    		render json: {status: 'success'}
		else
			render json: {status: 'error'}
    	end
    end

    def render_task
    	task = Task.where(id: params[:id]).first
    	response_hash = Hash.new
    	response_hash[:status] = 'success'
    	response_hash[:data] = task
        comments = Comment.where(task_id: task.id, active: true)
        response_hash[:comments] = []
        comments.each do |comment|
            object = Hash.new
            object[:id] = comment.id
            object[:comment] = comment.comment
            time_stamp = comment.created_at.to_datetime
            object[:time] = time_stamp.advance(:hours => 5.5).strftime("%d-%m-%Y")
            response_hash[:comments] << object
        end
    	render json: response_hash
    end

    def add_comments
        comment = Comment.new
        comment.comment = params[:comment]
        comment.task_id = params[:task_id]
        comment.active = true
        if(comment.save)
            render json: {status: 'success'}
        else
            render json: {status: 'error'}
        end
    end

    def delete_comment
        comment = Comment.where(id: params[:id]).first
        comment.active = params[:active]
        if(comment.save)
            render json: {status: 'success'}
        else
            render json: {status: 'error'}
        end
    end

    def delete_task
        task = Task.where(id: params[:id]).first
        task.active = params[:active]
        if(task.save)
            list = List.where(id: task.list_id).first
            response_hash = Hash.new
            response_hash[:status] = 'success'
            response_hash[:data] = list.board_id

            render json: response_hash
        else
            render json: {status: 'error'}
        end
    end
end
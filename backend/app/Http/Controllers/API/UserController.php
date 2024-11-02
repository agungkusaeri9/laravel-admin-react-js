<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request('search');
        $paginate = request('paginate') ?? 10;

        $users = User::orderBy('name', 'ASC');
        if ($search) {
            $users = $users->where('name', 'like', '%' . $search . '%')->orWhere('email', 'like', '%' . $search . '%');
        } else {
            $users = $users->whereNotNull('id');
        }

        $data = $users->paginate($paginate);

        // Menyusun pagination data
        $pagination = [
            'current_page' => $data->currentPage(),
            'last_page' => $data->lastPage(),
            'per_page' => $data->perPage(),
            'total' => $data->total(),
        ];

        // Mengembalikan response dengan data dan pagination
        return ResponseFormatter::success(UserResource::collection($data), "Users Found.", 200, $pagination);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make(request()->all(), [
            'name' => ['required'],
            'email' => ['required', 'unique:users,email'],
            'password' => ['required', 'min:5', 'confirmed'],
            'password_confirmation' => ['required'],
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::validationError($validator->errors());
        }

        $data = request()->all();
        $data['password'] = bcrypt($data['password']);
        try {
            $create = User::create($data);
            return ResponseFormatter::success($create, 'User has been created successfully.');
        } catch (\Throwable $th) {
            //throw $th;
            return ResponseFormatter::error(null, 'Failed to create user due to a technical issue.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if ($user) {
            return ResponseFormatter::success($user, 'User Found.');
        } else {
            return ResponseFormatter::error(null, 'User Not Found.', 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make(request()->all(), [
            'name' => ['required'],
            'email' => ['required', 'unique:users,email,' . $id],
            'password' => [Rule::when(request('password'), ['required', 'min:5', 'confirmed'])],
            'password_confirmation' => [Rule::when(request('password'), ['required'])],
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::validationError($validator->errors());
        }

        $data = request()->only(['name', 'email']);
        try {
            $user = User::find($id);
            if (request('password'))
                $data['password'] = bcrypt(request('password'));
            $user->update($data);
            return ResponseFormatter::success($user, 'User has been updated successfully.');
        } catch (\Throwable $th) {
            //throw $th;
            return ResponseFormatter::error(null, 'Failed to update user due to a technical issue.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        try {
            $user->delete();
            return ResponseFormatter::success($user, 'User has been deleted successfully.');
        } catch (\Throwable $th) {
            return ResponseFormatter::error(null, 'Failed to delete user due to a technical issue.');
        }
    }
}
